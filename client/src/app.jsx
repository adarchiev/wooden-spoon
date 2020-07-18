import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts:[
                {url:'pics/russianSpoons/rSpoon1.jpg', post:'firstPost'},
                {url:'pics/russianSpoons/rSpoon2.jpg', post:'second post'},
                {url:'pics/russianSpoons/rSpoon3.jpg', post:'third post'}
            ],
            component : 'home',
            russianSpoons : [
                'pics/russianSpoons/rSpoon1.jpg',
                'pics/russianSpoons/rSpoon2.jpg',
                'pics/russianSpoons/rSpoon3.jpg',
                'pics/russianSpoons/rSpoon4.jpg'
            ],
            articleSpoons : [
                'pics/articleSpoons/gSpoon1.jpg',
                'pics/articleSpoons/gSpoon2.jpg',
                'pics/articleSpoons/gSpoon3.jpg',
                
            ]
        }
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleBreadCrumbClick = this.handleBreadCrumbClick.bind(this);
    };
    handleSubmitPost(event){
        event.preventDefault();
        const file = document.getElementById('submitFile');
        let formData = new FormData();
        formData.append('file', file.files[0]);
        formData.append('text',  document.getElementById('textArea').value);
        
        fetch("http://localhost:3333/", {
            method:'POST',
            body: formData,
            contentType: false,
            processData: false
        })
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log('--------------------------');
            let postsFromDB = res.data.map((record) => ({url : record.url, post : record.post}))        
            this.setState({
                posts: postsFromDB
            })
        })
        .catch(err => console.log(err));
    }

    handleBreadCrumbClick(event){
        console.log(event.target.name);
        if(event.target.name === 'portal'){
            
            fetch("http://localhost:3333/", {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                contentType: false,
                processData: false
            })
            .then(result => result.json())
            .then(res => {
                let postsFromDB = res.data.map((record) => ({url : record.url, post : record.post}))        
                this.setState({
                    posts: postsFromDB
                });
            })
            .catch(err => {
                console.log(err)
            });
        }
        event.preventDefault();

        this.setState({
            component: `${event.target.name}`
        })
    }

        render(){
            let component = this.state.component;
            if( component === 'home'){
                return(
                    <div>
                        <h1>Wooden Spoon</h1>
                        < BreadCrumb click ={this.handleBreadCrumbClick} />
                        <div id='home'>
                            <div>
                                This site is created for fun only and should not bring to much attentions and criticism.
                                So if You ever wondered when and where spoons were first used.
                                Fun facts and pictures await You who wonder.
                                And if You have some antigue or cool looking WOODEN spoon pls share picture and story about that spoon.                
                               <br/><br/>
                               <br/> <br/>
                                    P.S. To everyone who helped me to be where I am now...thank you very much!!!
                                <div id='author'>                              
                                    ...Wooden Spoon Survivor  
                                </div>                 
                            </div>
                            
                              
                        </div> 
                    </div>
                )
            }
            else if(component === 'russian'){
                return(
                    <div>
                        < BreadCrumb click ={this.handleBreadCrumbClick} />
                        < RussianSpoons pics={this.state.russianSpoons}/>
                    </div>
                )
            }
            else if(component === 'article'){
                return(
                    <div>
                        < BreadCrumb click ={this.handleBreadCrumbClick} />
                        < Article pics={this.state.articleSpoons}/>
                    </div>
                )
            }
            else if(component === 'portal'){
                return(
                    <div>
                        < BreadCrumb click ={this.handleBreadCrumbClick} />
                        < SubmitForm submitForm={this.handleSubmitPost}/>
                        < Portal allPosts={this.state.posts}/>
                    </div>
                )
            }
        }

}
function Article(props){
    return(
        <div>
            <h2>History of Wooden Spoon</h2>
            <div id='history'>
            
                The word spoon derives from an ancient word meaning a chip of wood or horn carved from a larger piece.
                Wooden spoons were easy to carve and thus inexpensive, making them common throughout history.
                The Iron Age Celts (C. 250BC) of Britain used them. This is evidenced by an example of a small ladle discovered during archaeological excavations at the Glastonbury Lake Village. 
                Roman period spoons have been recovered from excavations in the City of London. The Anglo Saxons were great workers of wood, as were the Vikings, 
                and both these groups of settlers to the British Isles produced wooden spoons for domestic uses.
                <p/>
                <h3>Wooden spoon at the University of Cambridge</h3>
                <img src={props.pics[0]}></img>
                The wooden spoon was presented originally at the University of Cambridge as a kind of booby prize awarded by the students to the man 
                who achieved the lowest exam marks but still earned a third-class degree (a junior optime) in the Mathematical Tripos.
                The term "wooden spoon" or simply "the spoon" was also applied to the recipient, and the prize became quite notorious:
                <div id='grid'>
                    <blockquote>
                        And while he lives, he wields the boasted prize
                        Whose value all can feel, the weak, the wise;
                        Displays in triumph his distinguish'd boon,
                        The solid honours of the Wooden Spoon[
                    </blockquote>
                    <img src={props.pics[1]}></img>
                </div>
                The spoons themselves, actually made of wood, grew larger, and in latter years measured up to five feet long. 
                By tradition, they were dangled in a teasing way from the upstairs balcony in the Senate House, 
                in front of the recipient as he came before the Vice-Chancellor to receive his degree, at least until 1875 
                when the practice was specifically banned by the University.
                <p/>
                The lowest placed students earning a second-class (senior optime) or first-class degree (wrangler) were sometimes known 
                as the "silver spoon" and "golden spoon" respectively. In contrast, the highest-scoring male student was named the "senior wrangler". 
                Students unfortunate enough to place below the wooden spoon, by achieving only an Ordinary degree, were given a variety of names depending 
                on their number. In the 1860s about three-quarters of the roughly 400 candidates did not score enough to be awarded honours, 
                and were known as poll men.
                <p/>    
                The custom dates back at least to the late 18th century, being recorded in 1803, and continued until 1909.
                From 1910 onwards the results have been given in alphabetical rather than score order, and so it is now impossible to tell who has come last, 
                unless there is only one person in the lowest class.
                <h3>Last award</h3>
                The last wooden spoon was awarded to Cuthbert Lempriere Holthouse, an oarsman of the Lady Margaret Boat Club of St John's College, 
                Cambridge, in 1909 at the graduation ceremony in the University's Senate House. The handle is shaped like an oar and inscribed with an epigram 
                in Greek which may be translated as follows:
                <div id = 'grid2'>
                        <img src={props.pics[2]}></img>
                        <blockquote>
                            In Honours Mathematical,    
                            This is the very last of all
                            The Wooden Spoons which you see here;
                            O you who see it, shed a tear.
                        </blockquote>
                </div>
            </div>
        </div>
    )
}
function BreadCrumb(props){
        return(
            <div >
                <nav className="menu">
                    <ul>
                        <span><a href="" name = 'article' onClick={props.click} >Wooden Spoon History</a></span>
                        <span><a href="" name = 'russian' onClick={props.click} >Wooden Spoons in Russia</a></span>
                        <span><a href="" name='portal' onClick={props.click} >Spoon Portal</a></span>
                    </ul>
                </nav>
            </div>
        )
}

function RussianSpoons(props) {

    // console.log("RussianSpoons -> picst", images)
    return(
        <div>
            <h2>Russian Wooden Spoons</h2>
            <br/>
            <div id='images'>
                {props.pics.map((img, index) => <img src={img} id={index}></img>)}
            </div>
            <div id='russianArticle'>
            <div>
                Khokhloma or Khokhloma painting is the name of a Russian wood painting handicraft style and national ornament, 
                known for its curved and vivid mostly flower, berry and leaf patterns. Often Firebird, the figure from the Russian fairytale, is also depicted.
                <p/>
                The style is named for the village of Khokhloma in Koverninsky District, Nizhny Novgorod Oblast, Volga region,
                where it first appeared in the second half of the 17th century.
                n its early days Khokhloma became known in the Orient and the art of wood were produced for Indian and Persian markets. 
                Through an exhibition in Paris at the end of the 19th century, the Khokhloma style became known in the west.
                The style seemed to be fading away in the early 20th century, but it revitalized during the Soviet times. 
                The Khokhloma craftsmen united into artels in the 1920s to early 1930s. In the 1960s, the Soviets built a factory called the Khokhloma 
                Painter near the Khokhloma village and an industrial association called the Khokhloma Painting in a town of Semyonov. 
                These two factories have become the Khokhloma centers of Russia
            </div>
        </div> 
        </div>
    )
}
function Portal(props){
    console.log(props.allPosts)
    return(
        <div>
            <table>
                <tbody>
                        {
                            props.allPosts.map((item, index) => {
                               return ( 
                                    <tr>
                                        <td>
                                            <img src={item.url}></img>
                                        </td>
                                        <td>
                                            <p>
                                                {item.post}
                                            </p>
                                        </td>
                                    </tr>)
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}
function SubmitForm(props){
    console.log(props)
    return(
        <div>
            <form id='post'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type='file' id='submitFile' name='formSubmit' accept='image/png, image/jpeg'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea id='textArea' placeholder='Add a spoon history...'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={props.submitForm} type='submit'>Submit Post</button>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </form>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
