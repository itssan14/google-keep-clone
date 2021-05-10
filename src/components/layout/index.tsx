import * as React from 'react';
import { motion } from 'framer-motion';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useGlobalState } from 'hooks/useGlobalState';

const useWindowSize = () => {
  let [size, setSize] = React.useState({ width: undefined, height: undefined });
  React.useEffect(() => {
    function listener() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', listener);
    listener();
    return () => window.removeEventListener('resize', listener);
  }, []);

  return size;
};

const selector = state => state.sidebar.isOpen;
export default function Layout({ children }) {
  const [showSidebar] = useGlobalState<boolean>(selector);
  const { width } = useWindowSize();
  const isMobile = width < 550;

  console.log({ isMobile, width });

  return (
    <>
      <Header />
      <Sidebar isVisible={showSidebar} />
      <motion.div
        style={{ padding: 24 }}
        animate={
          !showSidebar
            ? { x: 0, width: '100%' }
            : !isMobile
            ? { x: 280, width: 'calc(100% - 280px)' }
            : { x: 0, width: '100%' }
        }
        transition={{ ease: 'easeInOut', duration: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
