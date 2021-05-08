import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

type SelectorFunction<k> = (state: RootState) => k;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export function useGlobalState<I>(selector: SelectorFunction<I>) {
  const state = useSelector<RootState, I>(selector);
  const dispatch = useDispatch<AppDispatch>();

  return [state, dispatch] as [typeof state, typeof dispatch];
}
