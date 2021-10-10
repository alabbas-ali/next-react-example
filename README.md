# next-react-example

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# 15 Custom Hooks to Make your React Component Lightweight
1. useIdle:
The useIdle hook tracks if the user on the page is idle. You can pass two params — ms is time to consider idle and initialState, which allows the user to set idle initially.
```
import {useIdle} from 'react-use';
const Demo = () => {
  const isIdle = useIdle(3e3);
return (
    <div>
      <div>User is idle: {isIdle ? 'Yes 😴' : 'Nope'}</div>
    </div>
  );
};
```
2. useInterval:
This hook to use for interval-related functionalities. Which handles clearIntervalon component unmount automatically. It also allows pausing the interval by setting the delay to null.
```
import * as React from 'react';
import {useInterval} from 'react-use';
const Demo = () => {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);
useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );
return (
    <div>
      <div>
        delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={toggleIsRunning}>{isRunning ? 'stop' : 'start'}</button>
      </div>
    </div>
  );
};
```
3. useScroll:
This hook is used to listen to the scroll event of the element and rerenders on scrolling. Not required to add the JavaScript event listeners manually.
```
import {useScroll} from 'react-use';
const Demo = () => {
  const scrollRef = React.useRef(null);
  const {x, y} = useScroll(scrollRef);
return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
```
4. useToggle:
This hook is used to toggle between two states like TRUE, FALSE. This approach reduces the manual logic.
```
import {useToggle} from 'react-use';
const Demo = () => {
  const [on, toggle] = useToggle(true);
return (
    <div>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );
};
```
5. useTitle:
This hook is used to set the page title.
```
import {useTitle} from 'react-use';
const Demo = () => {
  useTitle('Hello world!');
return null;
};
```
6. usePrevious:
This hook is used to get the previous state. We might not require to write custom logic to get the previous state.
```
import {usePrevious} from 'react-use';
const Demo = () => {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);
return (
    <p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>
        Now: {count}, before: {prevCount}
      </p>
    </p>
  );
};
```
7. useSetState:
This hook is used to merge objects into their current state, similar to the this.setStatein the class component. If you are using multiple states, it can be brought down to a single object state using useSetState
```
import {useSetState} from 'react-use';
const Demo = () => {
  const [state, setState] = useSetState({});
return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({hello: 'world'})}>hello</button>
      <button onClick={() => setState({foo: 'bar'})}>foo</button>
      <button 
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }))
        }}
      >
        count
      </button>
    </div>
  );
};
```
8. useCookie:
This hook is used to return the current value of a cookie, a callback to update the cookie and a callback to delete the cookie.
```
import { useCookie } from "react-use";
const Demo = () => {
  const [value, updateCookie, deleteCookie] = useCookie("my-cookie");
  const [counter, setCounter] = useState(1);
useEffect(() => {
    deleteCookie();
  }, []);
const updateCookieHandler = () => {
    updateCookie(`my-awesome-cookie-${counter}`);
    setCounter(c => c + 1);
  };
return (
    <div>
      <p>Value: {value}</p>
      <button onClick={updateCookieHandler}>Update Cookie</button>
      <br />
      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  );
};
```
9. usePermission:
This hook is used to get the permission status of the browser API. Pass the API name to get the permission status.
```
import {usePermission} from 'react-use';
const Demo = () => {
  const state = usePermission({ name: 'microphone' });
return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
10. useDebounce:
This hook is used to delay the event until the wait time is completed. In the below code, the setState is performed after the wait time is completed.
```
const Demo = () => {
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');
const [, cancel] = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );
return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
        <button onClick={cancel}>Cancel debounce</button>
      </div>
    </div>
  );
};
```
11. useGeolocation:
This hook is used to get the user geolocation. useGeolocation returns latitude, longitude, altitude, and more info.
```
import {useGeolocation} from 'react-use';
const Demo = () => {
  const state = useGeolocation();
return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
12. useNetworkState:
This hook is used to get the network status of the browser. useNetworkState can be used the show the connection status to the user.
```
import {useNetworkState} from 'react-use';
const Demo = () => {
  const state = useNetworkState();
return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
13. useCopyToClipboard:
useCopyToClipboard hook is used to copy the text to the clipboard.
```
const Demo = () => {
  const [text, setText] = React.useState('');
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={() => copyToClipboard(text)}>copy text</button>
      {state.error
        ? <p>Unable to copy value: {state.error.message}</p>
        : state.value && <p>Copied {state.value}</p>}
    </div>
  )
}
```
14. useFavicon:
The useFavicon hook is used to set the favicon of the page.
```
import {useFavicon} from 'react-use';
const Demo = () => {
  useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');
return null;
};
15. useError
useError hook is used to dispatch errors.
import { useError } from 'react-use';
const Demo = () => {
  const dispatchError = useError();
const clickHandler = () => {
    dispatchError(new Error('Some error!'));
  };
return <button onClick={clickHandler}>Click me to throw</button>;
};
// In parent app
const App = () => (
  <ErrorBoundary>
    <Demo />
  </ErrorBoundary>
);
```
