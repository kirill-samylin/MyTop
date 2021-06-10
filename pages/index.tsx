import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../compoments';
import { withLayout } from '../layout/Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <div>
      <Htag tag="h1">1234</Htag>
      <Button appearance="primary" arrow="rigth">Кнопка</Button>
      <Button appearance="ghost" arrow="down">Кнопка</Button>
      <P>fadsf</P>
      <Tag color="red">HH</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map((m) => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
      
    </div>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory,
    }
  }
}
interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCatefory: number;
};