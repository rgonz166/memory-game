const shuffle = () => {
  const assets = [
    { image: "/public/assets/css.png" },
    { image: "/public/assets/html5.png" },
    { image: "/public/assets/jquery.png" },
    { image: "/public/assets/js.png" },
    { image: "/public/assets/next.png" },
    { image: "/public/assets/node.png" },
    { image: "/public/assets/react.png" },
    { image: "/public/assets/ts.png" },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
