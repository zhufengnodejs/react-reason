const createDOMFromString = function(domString){
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div.children[0];
}

class LikeButton{
    constructor(){
        this.state = {isLiked:false};
    }
    handleClick(){
        let btnTxt = document.querySelector('.like-text');
        this.state.isLiked = !this.state.isLiked;
        if(this.state.isLiked)
            btnTxt.innerHTML = '取消';
        else
            btnTxt.innerHTML = '点赞';
    }
    render(){
        this.ele = createDOMFromString(`
             <button class="like-btn">
                <span class="like-text">点赞</span>
             </button>
            `);
        this.ele.addEventListener('click',this.handleClick.bind(this));
        return this.ele;
    }
}