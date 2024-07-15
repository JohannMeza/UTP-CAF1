import { ReactP5Wrapper } from 'react-p5-wrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sketch = (p5: any): void => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export default (): React.ReactNode => <ReactP5Wrapper sketch={sketch} />;