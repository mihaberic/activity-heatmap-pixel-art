// @ts-check

const heatmap = forceGetById("heatmap");
const editorToolbar = forceGetById("editorToolbar");
const shellScriptExport = forceGetById("shellScriptExport");

function forceGetById(id) {
    const result = document.getElementById(id);
    if (!result) {
        throw "missing item " + id;
    }
    return result;
}

let selectedColor = 0;
// TODO: move the for loops into functions instead of just running it here.
for (let i = 0; i < 360; i++) {
    const pixel = document.createElement("div");
    pixel.dataset.colorLevel = "0";
    pixel.onclick = () => {
        pixel.dataset.colorLevel = selectedColor + "";
    };
    heatmap.append(pixel);
}

for (let i = 0; i < 5; i++) {
    const label = document.createElement("label");
    label.dataset.colorLevel = i + "";
    label.onclick = () => {
        selectedColor = i;
    };

    const input = document.createElement("input");
    input.checked = i === 0;
    input.value = i + "";
    input.name = "color";
    input.type = "radio";
    label.append(input);

    editorToolbar.append(label);
}

function exportData() {
    const data = Array.from(heatmap.querySelectorAll("div")).map((item) => {
        return parseInt(
            /** @type {HTMLElement}*/ (item).dataset.colorLevel ?? "0"
        );
    });
    console.log(data);
    const dates = createCommitDateListFromHeatmapValues(
        /** @type {any}*/ (data)
    );
    const linesOfBash = bashScriptToCreateFakeCommitHistory(dates);
    // TODO: add a "copy to clipboard button for this."
    console.log(linesOfBash);

    shellScriptExport.textContent = linesOfBash.join("\n");
}

/**
 * @param {(0 | 1 | 2 | 3 | 4)[]} mapData
 * @returns {string[]}
 */
function createCommitDateListFromHeatmapValues(mapData) {
    const levelToNumOfCommits = {
        0: 0,
        1: 1,
        2: 3,
        3: 4,
        4: 7,
    };
    const DAY_MS = 1000 * 60 * 60 * 24;
    /* Top right corner of heatmap. Must be Sunday. */
    const startDate = findFirstSundayDaysAgo(360).getTime();
    // TODO
    return mapData
        .map((level, index) => {
            const iterations = levelToNumOfCommits[level];
            return Array.from({ length: iterations }).map((_, i) => {
                return new Date(
                    startDate + DAY_MS * index + 1000 * 60 * i
                ).toJSON();
            });
        })
        .flat();
}

/**
 * @param {string[]} dates
 */
function bashScriptToCreateFakeCommitHistory(dates) {
    const outputFile = "file-for-commits.txt"; // TODO: Make this configurable
    const lines = dates
        .map((date, index) => {
            const oneCommit = [
                `echo "Some text for ${date}" >> ${outputFile}`,
                `git add ${outputFile}`,
                `GIT_AUTHOR_DATE="${date}" GIT_COMMITTER_DATE="${date}" git commit -m "commit for ${date} - ${index}"`,
                "",
            ];

            return oneCommit;
        })
        .flat();

    return lines;
}

async function importExample(fileName) {
    const path = "example-pixel-art/" + fileName;
    /** @type {(0 | 1 | 2 | 3 | 4)[]} */
    const mapData = await (await fetch(path)).json();
    console.log(mapData);

    const pixelElements = Array.from(heatmap.querySelectorAll("div"));
    pixelElements.forEach((item, index) => {
        item.dataset.colorLevel = mapData[index] + "";
    });
}

/** DISCLAIMER: Maybe this would not be ok in all timezones. */
function findFirstSundayDaysAgo(daysAgo) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysAgo);
    let dayOfWeek = currentDate.getDay();
    let daysToPreviousSunday = dayOfWeek;
    currentDate.setDate(currentDate.getDate() - daysToPreviousSunday);
    currentDate.setHours(10)
    currentDate.setMinutes(11)
    return currentDate;
  }

async function init() {
    await importExample("smiley-and-hihi.json");
    exportData();
}
// init();
