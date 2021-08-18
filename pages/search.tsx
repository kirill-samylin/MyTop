import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../compoments';
import { withLayout } from '../layout/Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';
import { API } from '../helpers/api';

function Search(): JSX.Element {
  return (
    <>
    </>
  );
};

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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
  firstCategory: number;
};