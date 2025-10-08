

function fetchDataFromAPIAndPostToPage(){
    const postFetcher = {};

    postFetcher.debug = true;
    postFetcher.body = document.getElementById("postHolder");

    //this is really for style; it's just the leading to the chain of events that will get the data
    //from the API and post it on this page.
    postFetcher.go = async ()=> {
        postFetcher.getJson();
    }

    //call the API and ask for posts
    postFetcher.getJson = async () => {
        if (postFetcher.debug){console.log("Calling Json")}
        const res = await fetch("/api/posts");
        if (!res.ok){
            console.error("Failed to fetch posts");
        }

        //convert to JSON
        const posts = await res.json();
        if (postFetcher.debug){console.log("recieved Data",posts)}
        for (let i = 0;i < posts.length;i++){
            postFetcher.postJsonToLocalPage(posts[i]);
            if (postFetcher.debug){console.log("logging post",posts[i])}
        }
    }

    //serve posts to local page.
    postFetcher.postJsonToLocalPage = async (json) =>{
        let newPost = document.createElement('div');
        newPost.classList.add("card","review");
        newPost.innerHTML = postFetcher.postBodyFiller(json);
        postFetcher.body.appendChild(newPost);
    }

    postFetcher.postBodyFiller = (json) => {
        if (postFetcher.debug){console.log("inserting data",json)}
        const code = 
        `<div class="card-body">
                <div class="card-title hstack">
                    <h5 class="hike-title flex-grow-1">${json.Trail_Name}</h5>
                    <h6 class="milage">${json.Mileage}mi</h6>
                    <div class="rating">
                        ${postFetcher.putStarValueText(json.Star_Rating)}
                    </div>
                    <a class="map-link" href="/external/gmaps"><span class="material-symbols-outlined">map</span></a>
                    
                </div>
                <div class="card-middle card-title hstack">
                    <h6 class="difficulty flex-grow-1">${json.Difficulty}</h5>
                    <h6 class="time">${json.Time_Taken}</h6>
                </div>
                <p class="card-text">${json.Description}</p>
            </div>`
        return code;
    }

    postFetcher.putStarValueText = (number_of_stars) => {
        let final_string = ""
        for (let i = 0;i< Math.round(number_of_stars); i ++){
            final_string += `<i class="star bi bi-star-fill"></i>`
        }
        for (let i = 0;i<(5- Math.round(number_of_stars));i++){
            final_string += `<i class="star bi bi-star"></i>`
        }
        return final_string;
    }
    return postFetcher;
}


console.log("hi");

const hermes = fetchDataFromAPIAndPostToPage();

hermes.go();