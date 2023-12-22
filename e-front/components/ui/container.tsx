interface ContainerProps {
    children: React.ReactNode;
  }
  
  const Container: React.FC<ContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="mx-auto max-w-7xl pt-[200px]">
        {children}
      </div>
     );
  };
  
  export default Container;