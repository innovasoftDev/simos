export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

//import { getPaginatedProductsWithImages } from '@/actions';
import { Title } from '@/components';



interface Props {
  searchParams: {
    page?: string; 
  }
}


export default async function Home({ searchParams }: Props) {

  //const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  //const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  /* if ( products.length === 0 ) {
    redirect('/');
  } */


  return (
    <>
      <Title
        title="Dashboard"
        subtitle="Todo irá acá"
        className="mb-2"
      />
    







      {/* <ProductGrid 
        products={ products }
      /> */}


      {/* <Pagination totalPages={ totalPages } /> */}
      
    </>
  );
}
