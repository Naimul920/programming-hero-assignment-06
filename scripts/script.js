const handelAllPost = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const allPost = data.posts;
    handelShowPost(allPost);


}
handelAllPost();

const handelShowPost = (allPost) => {
    const allPostContainer = document.getElementById('all-post-container');
    allPost.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('bg-[#F3F3F4]', 'p-10', 'flex', 'gap-10', 'rounded-3xl');
        // div.id.add('test1111');
        div.innerHTML = `
        <div>
        <div class="${element.isActive ? 'bg-green-400' : 'bg-red-500'} w-3 h-3 rounded-full relative -right-11 lg:-right-12 top-2"></div>
            <img src="${element?.image || 'image'}" alt="Image" class="w-16 rounded-lg">
        </div>
        <div class="w-full">
            <div class="flex gap-5 font-inter font-medium text-sm">
                <p class="font-inter text-sm font-normal leading-relaxed"># ${element?.category || 'category'}</p>
                <p class="font-inter text-sm font-normal leading-relaxed">Author : ${element?.author?.name || 'name'}</p>
            </div>
            <div class="border-b-2 border-dashed pb-5">
                <h5 class="font-bold text-xl leading-relaxed" id="title-post">${element?.title || 'title'}
                </h5>
                <p class="font-inter text-base leading-relaxed">${element?.description || 'description'}</p>
            </div>
            <div class="flex  justify-between pt-5">
                <div class="flex flex-col md:flex-row lg:flex-row gap-5">
                    <div class="flex gap-2 items-center">
                        <img src="images/Group 13.png" alt="" class="size-6">
                        <p class="font-inter text-base leading-relaxed">${element?.comment_count || 'comment_count'}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img src="images/Group 16.png" alt="" class="size-6">
                        <p class="font-inter text-base leading-relaxed">${element?.view_count || 'view_count'}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img src="images/tabler-icon-clock-hour-9.png" alt="" class="size-6">
                        <p class="font-inter text-base leading-relaxed">${element?.posted_time || 'posted_time'} min</p>
                    </div>
                </div>
                <div>
                    <button class="btn" id="read-btn" onclick="handelReadBtn('${element?.title || 'title'}', '${element?.view_count || 'view_count'}')"><img src="images/email 1.png" alt=""></button>
                </div>
            </div>
        </div>
    `
        allPostContainer.appendChild(div);
    });
    loadingSpinner(false);

}
const handelSearch = async ()=>{
    loadingSpinner(true);
    const searchInput = document.getElementById('search-input');
    const categoryName = searchInput.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const sameCategoryPosts = data.posts
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.innerHTML = '';
    handelShowPost(sameCategoryPosts)
}
const loadingSpinner =(isLoading)=>{
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    }else{
        loadingSpinner.classList.add("hidden");
    }
}
const handelReadBtn = (title, view_count) => {
    const markAsReadContainer = document.getElementById("mark-as-read-container");
    const div = document.createElement('div');
    div.classList.add("flex","bg-white", "mt-5", "p-5", "gap-5", "rounded-2xl", "justify-between");
    div.innerHTML = `
        <p class="font-semibold text-base">${title}</p>
         <div class="flex items-center gap-1">
            <img src="images/Group 16.png" alt="" class="size-8">
            <p class="font-inter text-base font-light pr-5">${view_count}</p>
        </div>                 
        `
        markAsReadContainer.appendChild(div);
        const readCount = document.getElementById('read-count');
        const readCountText = readCount.innerText;
        const readCountnumber = parseInt(readCountText);
        readCount.innerText = readCountnumber + 1;
}

const handelLatestPost = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const allLatestPost = await res.json();
    handelLatestPostShow(allLatestPost)

}
handelLatestPost();

const handelLatestPostShow = (allLatestPost) => {
    const allLatestPostContainer = document.getElementById('all-latest-post-container');
    allLatestPost.forEach((latestPost) => {
        const div = document.createElement('div');
        div.classList.add('border', 'rounded-3xl', 'w-full', 'p-5');
        div.innerHTML = `
        <img src="${latestPost.cover_image}" alt="image" class="w-full rounded-3xl">
                        <div class="flex items-center gap-5 py-2">
                            <img src="images/Frame (1).png" alt="" class="size-5">
                            <p class="font-light text-sm">${latestPost?.author?.posted_date || "No publish date"}</p>
                        </div>
                        <h1 class="text-lg font-extrabold leading-relaxed">${latestPost.title || 'title'}</h1>
                        <p class="text-base leading-relaxed"></p>
                        <div class="flex gap-5 items-center py-3">
                            <img src="${latestPost.profile_image}" alt="" class="size-10 rounded-full">
                            <div>
                                <h3 class="font-bold text-lg">${latestPost?.author?.name || "name"}</h3>
                                <p class="text-sm font-light">${latestPost?.author?.designation || "Unknown"}</p>
                            </div>
                        </div>
        `
        allLatestPostContainer.appendChild(div);
    });
}