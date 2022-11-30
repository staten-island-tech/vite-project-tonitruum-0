export async function getTags(data) {
  let result = "";
  let result1 = [];
  //let tagArray = data.map(filterTags(data))
  data.forEach((d) => {
    result = data.map((d) => d.tags);
  });
  let i = 0;
  data.forEach((d) => {
    if (d.tags.includes("cute") === true) {
      console.log(i);
      result1 = d.map((id) => id._id);
      i++;
    }
  });
  console.log(result1);
}

function filterTags(data) {}
