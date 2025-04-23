export function getCurrentPeriodMessage() {
    const currentHour = new Date().getHours();
  
    if (currentHour >= 6 && currentHour <= 11) {
      return 'Bom dia!';
    } else if (currentHour >= 12 && currentHour <= 18) {
      return 'Boa tarde!';
    } else {
      return 'Boa noite!';
    }
}