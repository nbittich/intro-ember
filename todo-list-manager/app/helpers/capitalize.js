import { helper } from '@ember/component/helper';

export default helper(function capitalize([data]) {
  if (!data || typeof data !== 'string') {
    return data;
  }
  return data.charAt(0).toUpperCase() + data.slice(1);
});
