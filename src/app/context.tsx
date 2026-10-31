import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { getSnapshot, subscribe } from '../api/marketplace';
import type { Role } from '../types/marketplace';
interface Context {
  role: Role;
  setRole: (role: Role) => void;
  bn: boolean;
  setBn: (value: boolean) => void;
  lite: boolean;
  setLite: (value: boolean) => void;
  notice: string;
  notify: (message: string) => void;
}
const AppContext = createContext<Context | undefined>(undefined);
export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('client');
  const [bn, setBn] = useState(localStorage.getItem('nagale.locale') === 'bn');
  useEffect(() => {
    document.documentElement.lang = bn ? 'bn' : 'en';
  }, [bn]);
  const [lite, setLite] = useState(false);
  const [notice, notify] = useState('');
  const locale = (v: boolean) => {
    setBn(v);
    document.documentElement.lang = v ? 'bn' : 'en';
    localStorage.setItem('nagale.locale', v ? 'bn' : 'en');
  };
  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        bn,
        setBn: locale,
        lite,
        setLite,
        notice,
        notify,
      }}
    >
      <div data-lite={lite}>{children}</div>
    </AppContext.Provider>
  );
}
export function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error('Missing application provider');
  return c;
}
export function useCopy() {
  const { bn } = useApp();
  return (en: string, bnText: string) => (bn ? bnText : en);
}
export function useMarket() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
export function useMoney() {
  const { bn } = useApp();
  return (n: number) =>
    '৳' +
    new Intl.NumberFormat(bn ? 'bn-BD' : 'en-IN', {
      maximumFractionDigits: 0,
    }).format(n);
}
