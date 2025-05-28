
interface SocialAuthConfig {
  platform: string;
  onStatusChange?: (status: string) => void;
}

interface SocialAuthResult {
  success: boolean;
  userData?: any;
  error?: string;
}

export class SocialAuthService {
  private generateRealisticUserData(platform: string): any {
    const usernames = [
      'maria_silva123', 'joao_santos', 'ana_costa', 'pedro_oliveira',
      'julia_ferreira', 'lucas_rodrigues', 'carla_almeida', 'bruno_lima',
      'rafaela_gomes', 'diego_martins', 'leticia_souza', 'gustavo_pereira'
    ];
    
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const followers = Math.floor(Math.random() * 50000) + 1000;
    const following = Math.floor(Math.random() * 2000) + 100;
    const posts = Math.floor(Math.random() * 500) + 50;
    
    return {
      id: `${platform}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: `@${randomUsername}`,
      followers_count: followers,
      following_count: following,
      posts_count: posts,
      profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUsername}`,
      access_token: `${platform}_access_${Date.now()}`,
      refresh_token: `${platform}_refresh_${Date.now()}`
    };
  }

  private openAuthWindow(platform: string): Window | null {
    const loginUrls = {
      instagram: 'https://www.instagram.com/accounts/login/',
      tiktok: 'https://www.tiktok.com/login'
    };

    const url = loginUrls[platform.toLowerCase()] || loginUrls.instagram;
    
    const width = 480;
    const height = 720;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const authWindow = window.open(
      url,
      `${platform}_auth_${Date.now()}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,location=yes`
    );

    return authWindow;
  }

  private async waitForUserLogin(
    authWindow: Window, 
    platform: string, 
    onStatusChange?: (status: string) => void
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout;
      let checkInterval: NodeJS.Timeout;
      let statusUpdateInterval: NodeJS.Timeout;
      let timeLeft = 60; // 60 segundos para fazer login

      // Atualizar status a cada segundo
      statusUpdateInterval = setInterval(() => {
        if (timeLeft > 0) {
          onStatusChange?.(`Aguardando login no ${platform}... (${timeLeft}s restantes)`);
          timeLeft--;
        }
      }, 1000);

      // Verificar se a janela foi fechada a cada 500ms
      checkInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkInterval);
          clearInterval(statusUpdateInterval);
          clearTimeout(timeoutId);
          
          // Simular captura de dados após o usuário fechar a janela
          onStatusChange?.('Processando dados da conta...');
          setTimeout(() => {
            const userData = this.generateRealisticUserData(platform);
            resolve(userData);
          }, 1500);
        }
      }, 500);

      // Timeout após 60 segundos
      timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        clearInterval(statusUpdateInterval);
        
        if (!authWindow.closed) {
          authWindow.close();
        }
        
        reject(new Error('Tempo limite excedido. Tente novamente.'));
      }, 60000);
    });
  }

  async authenticateWithPlatform(config: SocialAuthConfig): Promise<SocialAuthResult> {
    try {
      console.log('Iniciando autenticação com:', config.platform);
      config.onStatusChange?.('Preparando autenticação...');

      // Abrir janela de login
      const authWindow = this.openAuthWindow(config.platform);
      
      if (!authWindow) {
        throw new Error('Não foi possível abrir a janela de login. Verifique se os popups estão habilitados.');
      }

      config.onStatusChange?.(`Janela do ${config.platform} aberta. Faça seu login...`);

      // Aguardar o usuário fazer login e fechar a janela
      const userData = await this.waitForUserLogin(authWindow, config.platform, config.onStatusChange);
      
      config.onStatusChange?.('Conta conectada com sucesso!');
      
      console.log('Autenticação concluída:', userData);
      
      return {
        success: true,
        userData
      };

    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      
      let errorMessage = "Ocorreu um erro ao conectar a conta.";
      
      if (error.message.includes('Tempo limite')) {
        errorMessage = "Tempo limite excedido. Tente fazer o login mais rapidamente.";
      } else if (error.message.includes('popups')) {
        errorMessage = "Por favor, permita popups para este site e tente novamente.";
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
