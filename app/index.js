import SearchBar from './components/searchbar/index.js';
import Carousel from './components/carousel/index.js';
import Clip from './components/carousel/Clip.js';
import Pagination from './components/pagination/Pagination.js';
import Control from './components/pagination/Control.js';

const body = document.createDocumentFragment();
const searchbar = new SearchBar();
const carousel = new Carousel();
const pagination = new Pagination();
body.append(searchbar.self);
body.append(carousel.self);
body.append(pagination.self);
document.body.prepend(body);

function submit(event) {
    if(event) event.preventDefault();
   
    searchbar.youtube.search(searchbar.input.value).then(
        (result) => {
            const clips = document.createDocumentFragment();
            console.log('загрузка');
            const items = JSON.parse(result.response).items;
            searchbar.youtube.next = JSON.parse(result.response).nextPageToken;
            console.log(JSON.parse(result.response));
            items.forEach( (item, i) => {
                const clip = new Clip(item);
                
                searchbar.youtube.getViews(item.id.videoId).then(
                    (res) => {
                        const items = JSON.parse(res.response).items;
                        clip.views.innerText = items[0].statistics.viewCount;
                    }
                )
                clips.append(clip.self);
                
               
                
            });
            carousel.self.append(clips);
          
            carousel.clipsPerPage = carousel.getClipsPerPage();
            carousel.pagesAmount = carousel.getPagesAmount();
            if(pagination.empty) {
                pagination.addControls(carousel.pagesAmount);
               
                pagination.controls[pagination.currentControl].classList.add('current');
            }

        },
        (result)=>{
            console.log('reject');
        }
    )
}

searchbar.self.addEventListener('submit', submit)

window.onresize = () => {
    carousel.clipsPerPage = carousel.getClipsPerPage();
    carousel.pagesAmount = carousel.getPagesAmount();
    carousel.pageNumber = carousel.getClipsLeft() / carousel.getClipsPerPage();
    carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
}

let mousedownPoint = 0;
function mousedown(event){
    mousedownPoint = event.pageX;
    carousel.self.style.transition = null;
    mousemove();
}

function mousemove(){
    carousel.self.onmousemove = (event) => {
        carousel.self.style.transform = `translateX(${carousel.pageNumber *(-carousel.self.clientWidth) + event.pageX - mousedownPoint}px)`;
    }
}
function move(){
    carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
    carousel.self.style.transition = 'transform 1s';
    
}
carousel.self.addEventListener('mousedown', mousedown);
carousel.self.addEventListener('mouseup', (e) => {
    
    carousel.self.onmousemove = null;
    if(e.pageX < mousedownPoint) {
       
        if(carousel.pageNumber < carousel.pagesAmount - 1) carousel.pageNumber++;
        move();
    }
    if(e.pageX > mousedownPoint && carousel.pageNumber >= 0) {
        
        if(carousel.pageNumber > 0) carousel.pageNumber--;
        move();
    }
   
    
    carousel.clipsLeft = carousel.pageNumber * carousel.clipsPerPage;

    if(carousel.pageNumber >= carousel.pagesAmount / 2){
      
        submit();
        carousel.clipsTotal += searchbar.youtube.maxResults;
        carousel.pagesAmount = carousel.getPagesAmount();
        
    }
});

pagination.self.addEventListener('click', (event) => {
    const cellNumber = Number(event.target.innerText);
   
    if (cellNumber < pagination.lastControl.innerText &&
        event.target !== pagination.firstControl &&
        event.target !== pagination.lastControl){
            if(carousel.pageNumber >= carousel.pagesAmount / 2){
                submit();
                carousel.clipsTotal += searchbar.youtube.maxResults;
                carousel.pagesAmount = carousel.getPagesAmount();
            }  
        pagination.controls[pagination.currentControl].classList.remove('current')
        pagination.currentControl = event.target.getAttribute('data-index');    
        event.target.classList.add('current');
        carousel.pageNumber = cellNumber -1;
        move();
       
    }
    if(event.target === pagination.firstControl){
        if(cellNumber > 1) {
            pagination.controls.forEach(elem => elem.innerText--);
            pagination.controls[pagination.currentControl].classList.remove('current');
        pagination.currentControl = 1;
        pagination.controls[1].classList.add('current');
        }
        if(cellNumber === 1) {
            pagination.controls[pagination.currentControl].classList.remove('current');
            pagination.currentControl = event.target.getAttribute('data-index');    
            event.target.classList.add('current');
        }
        
        carousel.pageNumber = cellNumber -1;
            move();
            
    }
    if(event.target === pagination.lastControl){
       
        if(carousel.pageNumber >= carousel.pagesAmount / 2){
            submit();
            carousel.clipsTotal += searchbar.youtube.maxResults;
            carousel.pagesAmount = carousel.getPagesAmount();
        }  
        carousel.pageNumber = cellNumber -1;
        move();
        pagination.controls[pagination.currentControl].classList.remove('current');
        pagination.currentControl = event.target.getAttribute('data-index') - 1;
        pagination.controls[pagination.currentControl].classList.add('current');
        pagination.controls.forEach(elem => elem.innerText++);
    }
    
})