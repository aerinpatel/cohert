import { useRecoilValue, useSetRecoilState, RecoilRoot } from 'recoil'
import { atom, selector } from 'recoil';

const counterAtom = atom({
  key: 'counterAtom',
  default: 0,
});

const isEvenSelector = selector({
  key: 'isEvenSelector',
  get: ({ get }) => {
    const currentCount = get(counterAtom);
    return currentCount % 2 === 0;
  },
});

function App() {
  return (
    <RecoilRoot>
      <Buttons />
      <Counter />
      <IsEven />
    </RecoilRoot>
  );
}

function Buttons() {
  const setCounter = useSetRecoilState(counterAtom);

  const increase = () => setCounter(c => c + 2);
  const decrease = () => setCounter(c => c - 1);

  return (
    <>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </>
  );
}

function Counter() {
  const count = useRecoilValue(counterAtom);
  return <h2>{count}</h2>;
}

function IsEven() {
  const check = useRecoilValue(isEvenSelector);
  return <h1>{check ? "Even" : "Odd"}</h1>;
}

export default App;
