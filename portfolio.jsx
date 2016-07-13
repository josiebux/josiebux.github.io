var posts = [
  {
    title: "Elementsuite rebrand",
    sub: "Branding / 3D / print / web",
    caption: "The existing elementsuite branding was slick, but not memorable. Given the brief of \"We'd rather be odd than boring\", I gave elementsuite and its modular, \"pick 'n' mix\" elements a literal new dimension as 3D cubes.",
    images: [
      "img/es-brochure-outer.jpg",
      "img/es-brochure-inner.jpg",
      "img/es-story.jpg",
      "img/es-cards.jpg",
    ]
  },
  {
    title: "The Edge Magazine",
    sub: "Print / editorial",
    caption: "In my year as The Edge's Head of Design I laid up 9 print issues, on some very tight deadlines. It was sometimes stressful but always incredibly rewarding once the finished magazine was distributed across campus.",
    images: [
      "img/edge-focus.jpg",
      "img/edge-fincher.jpg",
      "img/edge-sheeran.jpg",
    ]
  },
  {
    title: "SUSU Theatre Group",
    sub: "Branding / print / web / video",
    caption: "Across three years involved with the University of Southampton's Theatre Group, I quickly became the go-to design guy for posters, flyers, trailers, clothing, and digital content. The design for Strawberries in January was some of my proudest work - it doesn't get much better than people stopping you in the street to say they've seen your posters and loved them.",
    images: [
      "img/tg-strawbs.jpg",
      "img/tg-medea.jpg",
      "img/tg-tape.jpg",
    ]
  },
  {
    title: "The Soton Tab",
    sub: "Print / editorial",
    caption: "My biggest freelance gig to date, putting together a tabloid newspaper for the Southampton branch of The Tab - it was a style and format I hadn't really touched before, and it was great to try something completely different.",
    images: [
      "img/soton-tab.jpg",
    ]
  },
];


// PRETTY-LOADING IMAGE.
var Image = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
    };
  },

  onImageLoad: function() {
    if (this.isMounted()) {
      this.setState({ loaded: true });
    }
  },

  componentDidMount: function() {
    var imgTag = ReactDOM.findDOMNode(this.refs.img);
    var imgSrc = imgTag.getAttribute('src');
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = imgSrc;
  },

  render: function() {
    var { className, ...props } = this.props;
    var rootClassName = className ? className + ' image' : 'image';
    if (this.state.loaded) {
      rootClassName += ' image-loaded';
    }
    return <img ref="img" {...props} className={rootClassName} />;
  }
});

// A POST, AS LOADED INTO THE MAIN LISTING
var Post = React.createClass({
  render: function() {
    var thispost = posts[this.props.id];
    return (
      <article className="full-height flex clickable" onClick={this.props.postClick.bind(this, this.props.id)}>
        <div className="picture half-width">
          <Image src={thispost.images[0]}></Image>
        </div>
        <div className="flex center column pad-10 half-width">
          <div>
            <h2>{thispost.title}</h2>
            <h4>{thispost.sub}</h4>
            <p>See more ⤏</p>
          </div>
        </div>
      </article>);
  }
});

var Intro = React.createClass({
  render: function() {
    return (
      <section id="intro" className="flex column center">
        <h1>I'm Joe.</h1>
        <p>I'm a designer / coder / helpful guy to have around.</p>
        <p>I've got a CompSci degree, an obsession with design, and a winning smile.<br />Or at least, the first two.</p>
        <p>My specialities are print stuff, branding, and web design.<br />
           But I'm also pretty useful with video, copywriting,<br />and doing all of the above at very short notice.</p>
      </section>
    );
  }
});

// A LIST OF MULTIPLE POSTS
var PostListing = React.createClass({
  render: function() {
    var postsToRender = [];
    for (var i in posts) {
      postsToRender.push(<Post id={i} postClick={this.props.postClick}></Post>);
    }
    return (<section className="PostListing">{postsToRender}</section>);
  }
});


// A POST, WHEN VIEWED ON ITS OWN.
var PostDetail = React.createClass({
  render: function() {
    var thispost = posts[this.props.id];
    var imagesToRender = [];
    for (var i in thispost.images) {
      imagesToRender.push(<Image src={thispost.images[i]}></Image>);
    }
    return (
      <section className="PostDetail flex column">
        <div id="backbutton" className="clickable" onClick={this.props.returnClick}>⤎ Back</div>
        <div className="pad-10">
          <h1>{thispost.title}</h1>
          <h4>{thispost.sub}</h4>
          <p>{thispost.caption}</p>
        </div>
        {imagesToRender}
      </section>);
  }
});

// MAIN PAGE CONTROL
var Portfolio = React.createClass({
  getInitialState: function() {
    return {
      selectedPost: false,
    };
  },
  selectPost: function(id) {
    this.setState({
      selectedPost: id,
    });
    window.scrollTo(0,0);
  },
  deselectPost: function() {
    console.log("Calling but not working.");
    this.setState({
      selectedPost: false,
    });
    window.scrollTo(0,0);
  },
  render: function() {
    if (this.state.selectedPost) {
      return(<PostDetail id={this.state.selectedPost} returnClick={this.deselectPost}></PostDetail>);
    } else {
      return(
        <div>
          <Intro></Intro>
          <PostListing type="all" postClick={this.selectPost}></PostListing>
        </div>
      );
    }
  }
});

ReactDOM.render(
  <Portfolio/>,
  document.getElementById('content')
);
