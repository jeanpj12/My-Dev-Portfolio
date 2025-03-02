interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
    return (
      <div>
        <p>
          {statusCode
            ? `Ocorreu um erro ${statusCode} no servidor`
            : 'Ocorreu um erro no cliente'}
        </p>
      </div>
    );
  }
  
  import { NextPageContext } from 'next';

  Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  };
  
  export default Error;