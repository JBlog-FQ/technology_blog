// 简单的权限验证工具
// 在实际产品中，应该使用更安全的认证方式，如JWT、OAuth等

// 管理员密码，实际应用中应该存储在环境变量或服务器端
const ADMIN_PASSWORD = 'admin123'; 

// 检查用户是否已登录为管理员
export const isAdmin = () => {
  // 仅在客户端运行
  if (typeof window === 'undefined') return false;
  
  // 检查localStorage中是否有管理员令牌
  const token = localStorage.getItem('adminToken');
  return token === ADMIN_PASSWORD;
};

// 管理员登录
export const adminLogin = (password) => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('adminToken', ADMIN_PASSWORD);
    return true;
  }
  return false;
};

// 管理员退出
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
}; 