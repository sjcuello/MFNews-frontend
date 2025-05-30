import { useParams } from "react-router-dom";


const Article = () => {

  const { id } = useParams();

  return (
    <div className="article">
      <h1 className="title">Article Title: {id}</h1>
      <p className="content">This is the content of the article.</p>
    </div>
  );
};

export default Article;