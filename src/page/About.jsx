import React, {useState} from 'react'
import styled from 'styled-components'

export default function About() {
    const [text] = useState('');


return(
    <div>
        <h1>About Notes!</h1>
        <p>Thanks for using the Notes game here are some tips on how to use it</p>
        <p>
            <strong>Features:</strong>
            <ul>
                <li>Create, edit and save your notes that only YOU can view</li>
                <li>Sort your notes into catagories for better and easier access/ finding capabilities</li>
            </ul>
        </p>
    </div>
);
}

const div = styled.div`
    padding: 30px;
    margin: auto;
    font-family: Arial, sans-serif;
`;

const h1 = styled.h1` 
    text-align: center;
`;

