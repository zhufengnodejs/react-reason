let updateQueue = {
    pending:false,
    updaters:[],
    batchUpdate(){
        updateQueue.updaters.forEach(updater => {
            updater.component.forceUpdate();
        });
    }
}
class Updater{
    constructor(component){
        this.component = component;
        this.pendingStates = [];
    }
    addState(particalState){
        this.pendingStates.push(particalState);
        updateQueue.pending?updateQueue.updaters.push(this):this.component.forceUpdate();
    }
}
class Component{
    constructor(props){
        this.props = props;
        this.$updater = new Updater(this);
    }
    createDOMFromString(domString){
        const div = document.createElement('div');
        div.innerHTML = domString;
        return div.children[0];
    }
    setState(particalState){
        this.$updater.addState(particalState);
    }
    forceUpdate(){
        let pendingStates = this.$updater.pendingStates;
        pendingStates.forEach(particalState=>Object.assign(this.state,particalState));
        this.$updater.pendingStates.length = 0;
        let oldEle = this.ele;
        let parent = oldEle.parentElement;
        this.getElement();
        parent.replaceChild(this.ele,oldEle);
    }
    getElement(){
        this.ele = this.createDOMFromString(this.render());
        this.ele.addEventListener('click',(event)=>{
            updateQueue.pending = true;
            this.handleClick.call(this,event);
            updateQueue.pending = false;
            updateQueue.batchUpdate();
        });
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
        console.log(this.state);
        this.setState({
            number:this.state.number+1
        })
        console.log(this.state);
        setTimeout(()=>{
            this.setState({
                number:this.state.number+1
            })
            console.log(this.state);
            this.setState({
                number:this.state.number+1
            })
            console.log(this.state);
        });
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