import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import NewPostPage from "./components/NewPost/NewPostPage";
import ViewPostPage from "./components/ViewPost/ViewPostPage";
import Navigation from "./components/Navigation/Navigation";
import { posts } from "./data/posts";

class App extends Component {
  state = {
    posts,
    id: "",
    title: "",
    category: "",
    body: ""
  };

  handleInputs = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState({ [name]: value });
  };

  handleSave = () => {
    let id = this.state.posts.length + 1;
    let title = this.state.title;
    let category = this.state.category;
    let body = this.state.body;

    this.setState({
      posts: this.state.posts.concat([
        {
          id,
          title,
          category,
          body
        }
      ])
    });

 
  };

  componentDidUpdate() {
    console.log({
      posts: this.state.posts,
      id: this.state.posts.length,
      title: this.state.title,
      category: this.state.category,
      body: this.state.body
    });
  }

  render() {
    const PostWithId = ({ match }) => {
      return (
        <ViewPostPage
          post={
            this.state.posts.filter(
              post => post.id === parseInt(match.params.postId, 10)
            )[0]
          }
        />
      );
    };
 
    return (
      
      <div>
        <Navigation />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <HomePage posts={this.state.posts}/>}
          />
          <Route
            exact
            path="/posts/newpost"
            render={() => (
              <NewPostPage
                title={this.state.title}
                category={this.state.category}
                body={this.state.body}
                handleInputs={this.handleInputs}
                handleSave={this.handleSave}
              />
            )}
          />
          <Route exact path="/posts/:postId" component={PostWithId} />
          {/* If there is no matching, redirect to home */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
