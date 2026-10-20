const demoRoot = document.querySelector('[data-crane-demo]');

if (demoRoot) {
  const fleetDefinitions = [
    { model: 'ACE Hydra', state: 'Operating' },
    { model: 'Escorts Kubota / Farana', state: 'Idle' },
    { model: 'TIL', state: 'Maintenance' },
    { model: 'Manitowoc', state: 'Offline' },
    { model: 'ACE Hydra', state: 'Operating' },
    { model: 'Escorts Kubota / Farana', state: 'Operating' },
    { model: 'TIL', state: 'Idle' },
    { model: 'Manitowoc', state: 'Maintenance' },
    { model: 'ACE Hydra', state: 'Idle' },
    { model: 'Escorts Kubota / Farana', state: 'Offline' },
    { model: 'TIL', state: 'Operating' },
    { model: 'Manitowoc', state: 'Idle' }
  ];
  const fleet = fleetDefinitions.map((definition, index) => {
    const suffix = String(index + 1).padStart(2, '0');
    const stopped = definition.state === 'Maintenance';
    const idle = definition.state === 'Idle';
    return {
      ...definition,
      id: `H-${suffix}`,
      gateway: `DEMO-GW-${suffix}`,
      phase: index * .4,
      baseline: {
        rpm: stopped ? 0 : idle ? 750 + index * 5 : 1373 + index * 17,
        pressure: stopped ? 0 : idle ? 25 + index : 172 + index * 2,
        load: stopped || idle ? 0 : Number((1.6 + index * .1).toFixed(1)),
        fuel: 73 - index * 3,
        coolant: stopped ? 30 : idle ? 65 : 81,
        angle: 42 + index,
        extension: 10 + index * .5,
        battery: stopped ? 12.6 : 13.8,
        oil: stopped ? 0 : idle ? 2 : 3.6,
        hours: 2481.6 + index * 137
      }
    };
  });
  const detailUrl = id => `crane-monitoring.html?crane=${encodeURIComponent(id)}`;
  const fleetCards = document.getElementById('fleet-cards');
  const search = document.getElementById('fleet-search');
  const filter = document.getElementById('fleet-status');
  const summary = document.getElementById('fleet-summary');
  document.getElementById('fleet-size').textContent = `${fleet.length} SAMPLE CRANES`;
  document.getElementById('detail-fleet-size').textContent = String(fleet.length);
  const total = document.createElement('span');
  total.textContent = `${fleet.length} sample cranes · 0 live connections`;
  summary.append(total);
  ['Operating', 'Idle', 'Maintenance', 'Offline'].forEach(state => {
    const count = document.createElement('span');
    count.textContent = `${fleet.filter(crane => crane.state === state).length} ${state} (demo)`;
    summary.append(count);
  });
  const cards = fleet.map(crane => {
    const card = document.getElementById('fleet-card-template').content.cloneNode(true);
    const element = card.querySelector('article');
    const link = card.querySelector('[data-fleet-link]');
    link.textContent = crane.id;
    link.href = detailUrl(crane.id);
    const open = card.querySelector('[data-fleet-open]');
    open.href = link.href;
    open.setAttribute('aria-label', `Open monitoring for ${crane.id}`);
    const status = card.querySelector('[data-fleet-status]');
    status.textContent = `${crane.state} · demo`;
    status.dataset.state = crane.state;
    card.querySelector('[data-fleet-model]').textContent = crane.model;
    card.querySelector('[data-fleet-gateway]').textContent = crane.gateway;
    fleetCards.append(card);
    return { crane, element };
  });
  const applyFilters = () => {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach(({ crane, element }) => {
      const matches = `${crane.id} ${crane.model} ${crane.gateway} ${crane.state}`.toLowerCase().includes(query)
        && (!filter.value || crane.state === filter.value);
      element.hidden = !matches;
      if (matches) count += 1;
    });
    document.getElementById('fleet-count').textContent = `Showing ${count} of ${fleet.length} sample cranes`;
    document.getElementById('fleet-empty').hidden = count !== 0;
  };
  search.addEventListener('input', applyFilters);
  filter.addEventListener('change', applyFilters);
  document.getElementById('clear-fleet-search').addEventListener('click', () => {
    search.value = '';
    filter.value = '';
    applyFilters();
    search.focus();
  });
  applyFilters();
  const requestedId = new URLSearchParams(window.location.search).get('crane');
  const selectedCrane = fleet.find(crane => crane.id === requestedId);
  if (selectedCrane) {
    document.getElementById('fleet').hidden = true;
    demoRoot.hidden = false;
    document.title = `${selectedCrane.id} Monitoring | LiftX Infra`;
    initializeCrane(selectedCrane);
  } else if (requestedId !== null) {
    const error = document.getElementById('fleet-error');
    error.textContent = `Unknown sample crane ID "${requestedId}". Select a listed crane below; no substitute readings have been loaded.`;
    error.hidden = false;
  }

  function initializeCrane(crane) {
    const equipment = document.getElementById('demo-equipment');
    const startButton = document.getElementById('start-demo');
    const pauseButton = document.getElementById('pause-demo');
    const sampleStatus = document.getElementById('sample-status');
    const alertStatus = document.getElementById('alert-status');
    const events = document.getElementById('demo-events');
    fleet.forEach(asset => {
      const option = document.createElement('option');
      option.value = asset.id;
      option.textContent = `${asset.id} · ${asset.model}`;
      equipment.append(option);
    });
    equipment.value = crane.id;
    const offline = crane.state === 'Offline';
    const readings = {};
    let timer;
    let sample = 0;
    let alertCount = 0;
    let history = [];

    const render = () => {
      Object.entries(readings).forEach(([key, value]) => {
        const output = demoRoot.querySelector(`[data-reading="${key}"]`);
        if (output) output.textContent = value === null ? 'Unavailable' : key === 'hours' ? value.toFixed(1) : String(value);
        const meter = demoRoot.querySelector(`[data-meter="${key}"]`);
        if (meter) {
          meter.hidden = value === null;
          if (value !== null) meter.value = value;
        }
      });
      const points = key => history.map((point, index) => {
        const x = 36 + index * (410 / 29);
        const fraction = key === 'pressure' ? point.pressure / 250 : point.load / 5;
        return `${x.toFixed(1)},${(160 - fraction * 128).toFixed(1)}`;
      }).join(' ');
      document.getElementById('pressure-trend').setAttribute('points', points('pressure'));
      document.getElementById('load-trend').setAttribute('points', points('load'));
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
      startButton.disabled = offline;
      pauseButton.disabled = true;
    };

    const tick = () => {
      sample += 1;
      const wave = Math.sin(sample * .6 + crane.phase);
      const operating = crane.state === 'Operating';
      if (crane.state !== 'Maintenance') {
        readings.rpm = Math.round(crane.baseline.rpm + wave * (operating ? 130 : 20));
        readings.pressure = Math.round(crane.baseline.pressure + wave * (operating ? 18 : 2));
        readings.load = operating ? Number((crane.baseline.load + wave * .3).toFixed(1)) : 0;
        readings.coolant = Math.round(crane.baseline.coolant + Math.sin(sample * .2) * 3);
        readings.angle = operating ? Math.round(crane.baseline.angle + Math.sin(sample * .2) * 2) : crane.baseline.angle;
        readings.hours = crane.baseline.hours + sample * 2 / 3600;
      }
      history.push({ pressure: readings.pressure, load: readings.load });
      history = history.slice(-30);
      render();
      sampleStatus.textContent = `Running simulation · sample ${sample} · ${new Date().toLocaleTimeString()} (browser time)`;
    };

    const reset = () => {
      stop();
      sample = 0;
      alertCount = 0;
      history = [];
      Object.entries(crane.baseline).forEach(([key, value]) => {
        readings[key] = offline ? null : value;
      });
      document.getElementById('equipment-name').textContent = `${crane.id} · Individual Monitoring`;
      document.getElementById('equipment-model').textContent = `${crane.model} / illustrative sample asset`;
      const state = document.getElementById('equipment-state');
      state.textContent = `${crane.state.toUpperCase()} · SIMULATED`;
      state.dataset.state = crane.state;
      document.getElementById('gateway-id').textContent = crane.gateway;
      document.getElementById('gateway-scenario').textContent = offline ? 'Offline · simulated' : 'Online · simulated';
      const diagnosticNotes = {
        Operating: 'Simulated operating example. Health labels and readings do not represent an inspected crane.',
        Idle: 'Simulated idle example with unloaded hydraulics. No real fault codes have been read.',
        Maintenance: 'Simulated scheduled-maintenance example with engine stopped. No actual service order exists.',
        Offline: 'Simulated gateway outage. Readings are unavailable, not zero or healthy. No actual gateway has been contacted.'
      };
      document.getElementById('diagnostic-summary').textContent = diagnosticNotes[crane.state];
      demoRoot.querySelectorAll('[data-demo-health]').forEach(label => {
        label.textContent = offline ? 'UNAVAILABLE · DEMO' : crane.state === 'Maintenance' ? 'SERVICE · DEMO' : 'NORMAL · DEMO';
      });
      events.replaceChildren();
      alertStatus.textContent = 'No demo events. Test an alert to preview the workflow.';
      sampleStatus.textContent = offline
        ? 'Offline demo scenario · no samples available · choose another crane to run the simulator'
        : 'Ready · static simulated sample · press Start demo';
      render();
    };

    startButton.addEventListener('click', () => {
      stop();
      startButton.disabled = true;
      pauseButton.disabled = false;
      tick();
      timer = window.setInterval(tick, 2000);
    });
    pauseButton.addEventListener('click', () => {
      stop();
      sampleStatus.textContent = `Paused · simulated sample ${sample} · values frozen`;
    });
    document.getElementById('reset-demo').addEventListener('click', reset);
    equipment.addEventListener('change', () => {
      window.location.href = detailUrl(equipment.value);
    });
    document.getElementById('test-alert').addEventListener('click', () => {
      alertCount += 1;
      const item = document.createElement('li');
      item.textContent = `${new Date().toLocaleTimeString()} · ${crane.id} · SIMULATED TEST ${alertCount}: alert workflow preview. No actual threshold breach, device event or notification sent.`;
      events.prepend(item);
      if (events.children.length > 10) events.lastElementChild.remove();
      alertStatus.textContent = `${alertCount} demo test event(s) generated; latest 10 shown.`;
    });
    document.getElementById('clear-alerts').addEventListener('click', () => {
      events.replaceChildren();
      alertCount = 0;
      alertStatus.textContent = 'Demo alerts cleared. No production events were changed.';
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && timer !== undefined) {
        stop();
        sampleStatus.textContent = `Paused while page was hidden · simulated sample ${sample} · press Start demo to resume`;
      }
    });
    reset();
  }
}
