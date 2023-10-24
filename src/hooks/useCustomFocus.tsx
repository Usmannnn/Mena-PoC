import {useCallback} from 'react';

const useCustomFocus = () => {
  const setFocus = useCallback((ref: any) => {
    ref?.setNativeProps({hasTVPreferredFocus: true});
  }, []);

  return {setFocus};
};

export default useCustomFocus;
