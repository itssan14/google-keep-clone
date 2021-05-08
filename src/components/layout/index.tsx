import * as React from 'react';
import { motion } from 'framer-motion';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useGlobalState } from 'hooks/useGlobalState';

const selector = state => state.sidebar.isOpen;
export default function Layout({ children }) {
  const [showSidebar] = useGlobalState<boolean>(selector);

  return (
    <>
      <Header />
      <Sidebar isVisible={showSidebar} />
      <motion.div
        style={{ padding: 24 }}
        animate={
          !showSidebar
            ? { x: 0, width: '100%' }
            : { x: 280, width: 'calc(100% - 280px)' }
        }
        transition={{ ease: 'easeInOut', duration: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
