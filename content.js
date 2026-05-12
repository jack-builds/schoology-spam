(() => {

  const MAX_POSTS = 500;
  let count = 0;
  let running = false;

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function log(msg) {
    console.log(`[Helper] ${msg}`);
  }

  async function retry(fn, attempts = 3, delay = 1000) {
    for (let i = 0; i < attempts; i++) {
      try {
        const result = fn();
        if (result) return result;
      } catch (e) {
        console.log("Retry error:", e);
      }
      await sleep(delay);
    }
    return null;
  }

  function getCreateButton() {
    return document.querySelector('a[href*="/discussion/create"]');
  }

  function getTitleInput() {
    return document.querySelector("#edit-title");
  }

  function getSubmitButton() {
    return document.querySelector("#edit-submit");
  }

  async function createSinglePost() {

    if (count >= MAX_POSTS) {
      log("Max limit reached (500). Stopping.");
      running = false;
      return false;
    }

    const btn = await retry(getCreateButton);

    if (!btn) {
      log("Create button not found.");
      return false;
    }

    btn.click();
    await sleep(2000);

    const title = await retry(getTitleInput);

    if (!title) {
      log("Title input not found.");
      return false;
    }

    count++;

    title.value = `LAST DAY ${count}`;
    title.dispatchEvent(new Event("input", { bubbles: true }));

    const submit = await retry(getSubmitButton);

    if (!submit) {
      log("Submit button not found.");
      return false;
    }

    await sleep(500);
    submit.click();

    log(`Posted ${count}/${MAX_POSTS}`);

    return true;
  }

  async function run() {

    if (running) return;

    running = true;
    log("Started (manual mode)");

    while (running && count < MAX_POSTS) {

      const success = await createSinglePost();

      if (!success) {
        log("Step failed, retrying cycle...");
      }

      await sleep(1500 + Math.random() * 1500);
    }

    log("Stopped.");
    running = false;
  }

  // UI
  const panel = document.createElement("div");

  panel.style.position = "fixed";
  panel.style.bottom = "20px";
  panel.style.right = "20px";
  panel.style.zIndex = "999999";
  panel.style.background = "#222";
  panel.style.color = "#fff";
  panel.style.padding = "10px";
  panel.style.borderRadius = "8px";
  panel.style.fontFamily = "sans-serif";

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start (500 max)";
  startBtn.style.marginRight = "8px";

  const stopBtn = document.createElement("button");
  stopBtn.textContent = "Stop";

  startBtn.onclick = run;

  stopBtn.onclick = () => {
    running = false;
    log("Stopped manually");
  };

  panel.appendChild(startBtn);
  panel.appendChild(stopBtn);

  document.body.appendChild(panel);

})();
