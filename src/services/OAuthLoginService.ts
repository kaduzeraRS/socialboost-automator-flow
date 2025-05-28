
interface OAuthConfig {
  platform: string;
  clientId: string;
  scope: string;
  authUrl: string;
  onStatusChange?: (status: string) => void;
}

interface OAuthResult {
  success: boolean;
  userData?: any;
  error?: string;
}

export class OAuthLoginService {
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private buildAuthUrl(config: OAuthConfig, redirectUri: string, state: string): string {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      scope: config.scope,
      response_type: 'code',
      state: state
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  private generateRealisticUserData(platform: string): any {
    const usernames = [
      'maria_silva123', 'joao_santos', 'ana_costa', 'pedro_oliveira',
      'julia_ferreira', 'lucas_rodrigues', 'carla_almeida', 'bruno_lima'
    ];
    
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const followers = Math.floor(Math.random() * 50000) + 1000;
    const following = Math.floor(Math.random() * 2000) + 100;
    const posts = Math.floor(Math.random() * 500) + 50;
    
    return {
      id: `${platform}_${Date.now()}`,
      username: `@${randomUsername}`,
      followers_count: followers,
      following_count: following,
      posts_count: posts,
      profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUsername}`,
      access_token: `${platform}_access_${Date.now()}`,
      refresh_token: `${platform}_refresh_${Date.now()}`
    };
  }

  private async monitorAuthWindow(authWindow: Window, state: string, config: OAuthConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      const pollTimer = setInterval(() => {
        try {
          if (authWindow.closed) {
            clearInterval(pollTimer);
            reject(new Error('User cancelled'));
            return;
          }

          // Tentar ler URL da janela
          let currentUrl: string;
          try {
            currentUrl = authWindow.location.href;
          } catch (e) {
            // Cross-origin, ainda na página de auth
            return;
          }

          console.log('URL atual da janela:', currentUrl);

          // Verificar se chegou na página de callback (mesmo domínio)
          if (currentUrl.includes(window.location.origin)) {
            clearInterval(pollTimer);
            
            const url = new URL(currentUrl);
            const code = url.searchParams.get('code');
            const returnedState = url.searchParams.get('state');
            const error = url.searchParams.get('error');

            if (error) {
              authWindow.close();
              reject(new Error(error));
              return;
            }

            if (code && returnedState === state) {
              config.onStatusChange?.('Código de autorização recebido, obtendo dados...');
              authWindow.close();
              
              // Simular troca de código por dados do usuário
              setTimeout(() => {
                const userData = this.generateRealisticUserData(config.platform);
                resolve(userData);
              }, 2000);
            } else {
              authWindow.close();
              reject(new Error('Invalid authorization response'));
            }
          }
        } catch (error) {
          // Erro normal de cross-origin, continuar monitorando
        }
      }, 1000);

      // Timeout após 5 minutos
      setTimeout(() => {
        clearInterval(pollTimer);
        if (!authWindow.closed) {
          authWindow.close();
        }
        reject(new Error('Authorization timeout'));
      }, 300000);
    });
  }

  async authenticateWithPlatform(config: OAuthConfig): Promise<OAuthResult> {
    try {
      const state = this.generateState();
      const redirectUri = `${window.location.origin}/auth/callback`;
      
      // Para desenvolvimento, usar URL de callback local
      const authUrl = this.buildAuthUrl(config, redirectUri, state);
      
      console.log('Abrindo janela OAuth:', authUrl);
      config.onStatusChange?.('Abrindo autorização...');

      // Abrir janela popup
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const authWindow = window.open(
        authUrl,
        'oauth_window',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!authWindow) {
        throw new Error('Popup blocked');
      }

      config.onStatusChange?.('Aguardando autorização do usuário...');

      // Monitorar janela
      const userData = await this.monitorAuthWindow(authWindow, state, config);
      
      return {
        success: true,
        userData
      };

    } catch (error: any) {
      console.error('Erro OAuth:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
