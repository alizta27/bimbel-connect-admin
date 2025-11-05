import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import "@/styles/main.scss";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
