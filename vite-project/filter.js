export async function getTags (data) {
    let result = '';
    //let tagArray = data.map(filterTags(data))
    data.forEach(d => {
        return result = data.map(data.filter(df => df._id))
    });
    console.log(result);
}

function filterTags (data) {
}