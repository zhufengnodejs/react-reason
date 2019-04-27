class Component{
    constructor(props){
        this.props = props;
    }
    createDOMFromString(domString){
        const div = document.createElement('div');
        div.innerHTML = domString;
        return div.children[0];
    }
    setState(state){
        this.state = state;
        let oldEle = this.ele;
        let parent = oldEle.parentElement;
        this.getElement();
        parent.replaceChild(this.ele,oldEle);
    }
    getElement(){
        this.ele = this.createDOMFromString(this.render());
        this.ele.addEventListener('click',this.handleClick.bind(this));
    }
    $mount(container){
        this.getElement();
        container.appendChild(this.ele);
    }
}
class CounterButton extends Component{
    constructor(props){
        super(props);
        this.state = {number:0};
    }

    handleClick(){
        this.setState({
            number:this.state.number+1
        })
    }
    render(){
        return (
            `
             <button>
                <span>${this.state.number}</span>
             </button>
            `
        )
    }
}