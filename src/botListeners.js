import motya from '.';
import Royale from './royale';

const royale = new Royale();
const defaults = {};

const help = `Как пользоваться ботом:\n
<pre>/poehali [tag] [n]</pre>отображение статистики речной гонки\n<b>tag</b> - тэг клана, <b>n</b> - количество участников, по умолчанию 10
<pre>/setDefault [tag]</pre>устанавливает для канала тэг по умолчанию
<pre>/getDefault</pre>выводит текущий тэг по умолчанию
`;

motya.onText(/\/setDefault ([\d\w]*)/, ({ chat: { id } }, match) => {
  const tag = match[1];
  defaults[id] = tag;
});

motya.onText(/\/getDefault/, ({ chat: { id } }) => {
  motya.sendMessage(id, `${defaults[id]}`);
});

motya.onText(/\/help/, ({ chat: { id } }) => {
  motya.sendMessage(id, help, { parse_mode: 'HTML' });
});

motya.onText(/\/poehali\s?([\d\w]*)?\s?(\d*)/, async ({ chat: { id } }, match) => {
  const tag = match[1] || defaults[id];
  if(!tag) {
    motya.sendMessage(id, help, { parse_mode: 'HTML' });
    return;
  }
  const numberOfParticipants = match[2];
  try {
    const { riverData, lastUpdate, lastWarId } = await royale.getClanData(tag);
    const formattedParticipants = riverData
      .slice(0, numberOfParticipants ? Math.max(numberOfParticipants, 1) : 10)
      .map((p, i) => `${((i + 1) + ' ' + p.name).slice(0,10).padEnd(10)} : ${p.fame} ${p.repairPoints}`);
    motya.sendMessage(
      id,
      `Актуально на: ${new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(lastUpdate)}\n`
      + `Идентификатор войны: ${lastWarId}` + '\n'
      + '-------------------------\n'
      + '<pre>Наши герои: \n'
      + formattedParticipants.join('\n')
      + '</pre>',
      { parse_mode: 'HTML' }
    );
  } catch (e) {
    console.log(e);
  }
});