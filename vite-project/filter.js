export async function getqTags(data) {
  let result = "";
  let result1 = [];
  data.forEach((d) => {
    result = data.map((d) => d.tags);
  });
  let i = 0;
  data.forEach((d) => {
    if (d.tags.includes("cute") === true) {
      result1.push(d._id);
    }
  });
  console.log(result1);
}

function filterTags(data) {}


/* for each tag -> for each thing in data check if d.tags includs (tag value)
if === true then console.log (tag) */

export async function getTags(data) {
  let result = "";
  let result1 = [];
  
}