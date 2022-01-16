import React from 'react';
import './Article.css';
import 'bulma/css/bulma.min.css';
import { Box, Heading, Tag } from 'react-bulma-components';

function Article(props: any) {
    const [post, setPost] = React.useState<[any]>();
    const article = props.article;
    return (
        <Box id="article" key={article.rating} >
            <p id="info"><Tag>{article.hostName}</Tag> <Tag>{Math.round(100 * article.rating)}% Similarity</Tag></p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.name}</a>
        </Box>
    );
}

export default Article;
