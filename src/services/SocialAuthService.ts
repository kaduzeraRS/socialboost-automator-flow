
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
  private extractInstagramData(authWindow: Window): any | null {
    try {
      const doc = authWindow.document;
      console.log('Tentando extrair dados do Instagram...');
      
      // Extrair username - usando o seletor que você forneceu
      const usernameElement = doc.querySelector('span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft');
      const username = usernameElement?.textContent?.trim() || '';
      console.log('Username encontrado:', username);
      
      if (!username) {
        console.log('Username não encontrado, tentando outros seletores...');
        // Tentar outros seletores comuns para username
        const altUsernameSelectors = [
          'h2._aa3a._aa3b span',
          'h1._aa3a span',
          '[data-testid="user-avatar"] + div h2',
          'header section h2'
        ];
        
        for (const selector of altUsernameSelectors) {
          const element = doc.querySelector(selector);
          if (element?.textContent?.trim()) {
            const foundUsername = element.textContent.trim();
            console.log(`Username encontrado com seletor ${selector}:`, foundUsername);
            break;
          }
        }
      }
      
      // Extrair estatísticas usando seus seletores específicos
      let posts = 0, following = 0, followers = 0;
      
      // Posts - primeiro span com as classes que você forneceu
      const postsElement = doc.querySelector('span.x5n08af.x1s688f span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');
      if (postsElement) {
        posts = parseInt(postsElement.textContent?.trim() || '0');
        console.log('Posts encontrados:', posts);
      }
      
      // Seguidores - procurar pelo span com title (como você mostrou)
      const followersElement = doc.querySelector('span.x5n08af.x1s688f[title] span.html-span');
      if (followersElement) {
        const titleElement = followersElement.closest('span[title]');
        if (titleElement) {
          const titleValue = titleElement.getAttribute('title');
          followers = parseInt(titleValue || '0');
          console.log('Seguidores encontrados via title:', followers);
        }
      }
      
      // Se não encontrou via title, tentar via texto
      if (followers === 0) {
        const allStatsElements = doc.querySelectorAll('span.x5n08af.x1s688f span.html-span');
        console.log(`Encontrados ${allStatsElements.length} elementos de estatísticas`);
        
        if (allStatsElements.length >= 3) {
          posts = parseInt(allStatsElements[0]?.textContent?.trim() || '0');
          followers = parseInt(allStatsElements[1]?.textContent?.trim() || '0');
          following = parseInt(allStatsElements[2]?.textContent?.trim() || '0');
          console.log('Estatísticas por índice - Posts:', posts, 'Seguidores:', followers, 'Seguindo:', following);
        }
      }
      
      // Seguindo - último elemento das estatísticas
      if (following === 0) {
        const followingElements = doc.querySelectorAll('span.x5n08af.x1s688f span.html-span');
        if (followingElements.length >= 3) {
          following = parseInt(followingElements[2]?.textContent?.trim() || '0');
          console.log('Seguindo encontrado:', following);
        }
      }
      
      // Extrair foto do perfil - usando o seletor que você forneceu
      const profileImg = doc.querySelector('img.xz74otr.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x972fbf.xcfux6l.x1qhh985.xm0m39n.x5yr21d.x17qophe.x10l6tqk.x13vifvy.x11njtxf.xh8yej3');
      const profilePictureUrl = profileImg?.getAttribute('src') || '';
      console.log('Foto do perfil encontrada:', profilePictureUrl ? 'Sim' : 'Não');
      
      // Verificar se conseguimos extrair dados válidos
      if (!username && posts === 0 && followers === 0 && following === 0) {
        console.log('Nenhum dado válido extraído');
        return null;
      }
      
      const extractedData = {
        id: `instagram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: username.startsWith('@') ? username : `@${username}`,
        followers_count: followers,
        following_count: following,
        posts_count: posts,
        profile_picture_url: profilePictureUrl,
        access_token: `instagram_access_${Date.now()}`,
        refresh_token: `instagram_refresh_${Date.now()}`
      };
      
      console.log('Dados extraídos com sucesso:', extractedData);
      return extractedData;
      
    } catch (error) {
      console.error('Erro ao extrair dados do Instagram:', error);
      return null;
    }
  }

  private extractTikTokData(authWindow: Window): any | null {
    try {
      const doc = authWindow.document;
      console.log('Tentando extrair dados do TikTok...');
      
      // Tentar extrair dados reais do TikTok
      let username = '';
      let followers = 0;
      let following = 0;
      let posts = 0;
      
      // Seletores comuns para TikTok
      const usernameSelectors = [
        '[data-testid="user-page-nickname"]',
        'h1[data-testid="user-title"]',
        '.user-username',
        '[class*="username"]'
      ];
      
      for (const selector of usernameSelectors) {
        const element = doc.querySelector(selector);
        if (element?.textContent?.trim()) {
          username = element.textContent.trim();
          console.log(`Username do TikTok encontrado com ${selector}:`, username);
          break;
        }
      }
      
      // Se não conseguiu extrair dados reais, retornar null para não usar dados falsos
      if (!username) {
        console.log('Não foi possível extrair dados reais do TikTok');
        return null;
      }
      
      return {
        id: `tiktok_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: username.startsWith('@') ? username : `@${username}`,
        followers_count: followers,
        following_count: following,
        posts_count: posts,
        profile_picture_url: '',
        access_token: `tiktok_access_${Date.now()}`,
        refresh_token: `tiktok_refresh_${Date.now()}`
      };
    } catch (error) {
      console.error('Erro ao extrair dados do TikTok:', error);
      return null;
    }
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
      let extractionAttempts = 0;
      let timeLeft = 120; // Aumentado para 2 minutos

      // Atualizar status a cada segundo
      statusUpdateInterval = setInterval(() => {
        if (timeLeft > 0) {
          onStatusChange?.(`Aguardando login no ${platform}... (${timeLeft}s restantes)`);
          timeLeft--;
        }
      }, 1000);

      // Verificar se a janela foi fechada e tentar extrair dados a cada 3 segundos
      checkInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkInterval);
          clearInterval(statusUpdateInterval);
          clearTimeout(timeoutId);
          
          reject(new Error('Janela fechada antes da extração de dados. Faça login e navegue até seu perfil antes de fechar a janela.'));
          return;
        }

        // Tentar extrair dados se estiver logado (a cada 3 segundos)
        if (extractionAttempts < 20) {
          try {
            let userData = null;
            const currentUrl = authWindow.location.href;
            console.log('URL atual:', currentUrl);
            
            if (platform.toLowerCase() === 'instagram') {
              // Verificar se chegou na página do perfil
              if (currentUrl.includes('instagram.com') && !currentUrl.includes('login') && !currentUrl.includes('accounts')) {
                onStatusChange?.('Detectada página do perfil. Extraindo dados...');
                userData = this.extractInstagramData(authWindow);
                
                if (userData) {
                  clearInterval(checkInterval);
                  clearInterval(statusUpdateInterval);
                  clearTimeout(timeoutId);
                  
                  onStatusChange?.('Dados capturados com sucesso!');
                  authWindow.close();
                  resolve(userData);
                  return;
                }
              } else if (currentUrl.includes('login') || currentUrl.includes('accounts')) {
                onStatusChange?.('Faça seu login e navegue até seu perfil...');
              }
            } else if (platform.toLowerCase() === 'tiktok') {
              const currentUrl = authWindow.location.href;
              if (currentUrl.includes('tiktok.com') && !currentUrl.includes('login')) {
                onStatusChange?.('Detectada página do perfil. Extraindo dados...');
                userData = this.extractTikTokData(authWindow);
                
                if (userData) {
                  clearInterval(checkInterval);
                  clearInterval(statusUpdateInterval);
                  clearTimeout(timeoutId);
                  
                  onStatusChange?.('Dados capturados com sucesso!');
                  authWindow.close();
                  resolve(userData);
                  return;
                }
              }
            }
            
            extractionAttempts++;
          } catch (error) {
            console.log('Tentativa de extração falhou:', error);
            extractionAttempts++;
          }
        }
      }, 3000);

      // Timeout após 2 minutos
      timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        clearInterval(statusUpdateInterval);
        
        if (!authWindow.closed) {
          authWindow.close();
        }
        
        reject(new Error('Tempo limite excedido. Faça login e navegue até seu perfil mais rapidamente.'));
      }, 120000);
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

      config.onStatusChange?.(`Janela do ${config.platform} aberta. Faça seu login e navegue até seu perfil...`);

      // Aguardar o usuário fazer login e capturar dados REAIS
      const userData = await this.waitForUserLogin(authWindow, config.platform, config.onStatusChange);
      
      if (!userData) {
        throw new Error('Não foi possível extrair dados reais da conta. Verifique se você navegou até seu perfil.');
      }
      
      config.onStatusChange?.('Conta conectada com sucesso!');
      
      console.log('Autenticação concluída com dados reais:', userData);
      
      return {
        success: true,
        userData
      };

    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      
      let errorMessage = "Ocorreu um erro ao conectar a conta.";
      
      if (error.message.includes('Tempo limite')) {
        errorMessage = "Tempo limite excedido. Faça o login e navegue até seu perfil mais rapidamente.";
      } else if (error.message.includes('popups')) {
        errorMessage = "Por favor, permita popups para este site e tente novamente.";
      } else if (error.message.includes('Janela fechada')) {
        errorMessage = "Janela fechada muito cedo. Faça login e navegue até seu perfil antes de fechar.";
      } else if (error.message.includes('extrair dados')) {
        errorMessage = "Não foi possível capturar os dados da conta. Certifique-se de estar na página do seu perfil.";
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
