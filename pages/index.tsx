import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../compoments';
import { withLayout } from '../layout/Layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <div>
      <Htag tag="h1">1234</Htag>
      <Button appearance="primary" arrow="rigth">Кнопка</Button>
      <Button appearance="ghost" arrow="down">Кнопка</Button>
      <P>fadsf</P>
      <Tag color="red">HH</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </div>
  );
};

export default withLayout(Home);