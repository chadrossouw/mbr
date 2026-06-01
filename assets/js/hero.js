// gsap.registerPlugin(ScrollTrigger);

// const stack = document.querySelector(".hero-stack");
// const lines = stack.querySelectorAll("h1, h2, h3");

// // initial state
// gsap.set(lines, {
//   opacity: 0,
//   y: 60
// });

// const tl = gsap.timeline({
//   defaults: {
//     ease: "power3.out"
//   }
// });

// lines.forEach((line, i) => {

//   // delay increases gradually instead of fixed 0.6 blocks
//   const startTime = i * 0.8;

//   tl.to(line, {
//     opacity: 1,
//     y: 0,
//     duration: 1.1
//   }, startTime);

//   // smoother, slower "push up"
//   tl.to(stack, {
//     y: -i * 50,
//     duration: 1.2
//   }, startTime + 0.2);
// });

gsap.registerPlugin(ScrollTrigger);

const stacks = document.querySelectorAll(".hero-stack");

stacks.forEach((stack) => {

  const lines = stack.querySelectorAll("h1, h2, h3");

  gsap.set(lines, {
    opacity: 0,
    y: 60
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  lines.forEach((line, i) => {

    const startTime = i * 0.8;

    tl.to(line, {
      opacity: 1,
      y: 0,
      duration: 1.1
    }, startTime);

    tl.to(stack, {
      y: -i * 50,
      duration: 1.2
    }, startTime + 0.2);
  });

});