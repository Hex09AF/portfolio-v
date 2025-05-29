import { useSpring } from 'framer-motion';

function useSpringVector(initial: { x: number; y: number }, config = {}) {
  const x = useSpring(initial.x, config);
  const y = useSpring(initial.y, config);

  // const [x, setX] = useState(initial.x)
  // const [y, setY] = useState(initial.y)

  return {
    x,
    y,
    set: ({ x: newX, y: newY }: { x: number; y: number }) => {
      x.set(newX);
      y.set(newY);
    },
  };
}

export default useSpringVector