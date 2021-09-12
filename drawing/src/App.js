import MainPage from './App/Main/MainPage';
import InputWindow from './App/Try/InputWindow';
import Header from './App/Header';
import Footer from './App/Footer/Footer';
import Result from './App/Try/Result';
import About from './App/About/About';
import Contact from './App/Contact/Contact';
import News from './App/News/Contact';
import { Redirect, Route, Switch } from 'react-router';
import { Input } from '@material-ui/core';


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/input' component={InputWindow} />
        <Route path='/result' component={Result} />
        <Route path='/contact' component={Contact} />
        <Route path='/news' component={News} />
        <Route path='/' component={MainPage} />
        <Redirect to='/' />
      </Switch>
      <Footer />
    </div>
      

  );
}

export default App;
