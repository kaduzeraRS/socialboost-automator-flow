
import { useSocialAccountsData } from './useSocialAccountsData';
import { useSocialAccountsOperations } from './useSocialAccountsOperations';

export const useSocialAccounts = () => {
  const {
    accounts,
    loading,
    refetch,
    getAccountsByPlatformAndPeriod
  } = useSocialAccountsData();

  const {
    connectAccount,
    disconnectAccount
  } = useSocialAccountsOperations();

  return {
    accounts,
    loading,
    connectAccount,
    disconnectAccount,
    refetch,
    getAccountsByPlatformAndPeriod
  };
};
