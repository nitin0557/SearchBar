import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {ResultItem} from "./ResultItem";


export const  ResultList = React.memo(({ loading, results }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="results"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <AnimatePresence>
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <motion.div key={idx} className="result-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="thumb skeleton-box" />
                  <div className="meta">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line long" />
                  </div>
                </motion.div>
              ))
            : results.map((item, idx) => <ResultItem key={item.name + idx} item={item} idx={idx} />)}
        </AnimatePresence>

        {!loading && results.length === 0 && (
          <div className="empty">No results</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
})
