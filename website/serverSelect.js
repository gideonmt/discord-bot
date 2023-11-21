document.addEventListener('DOMContentLoaded', () => {
    const serverList = document.querySelector('#server-list');
    
    let servers = [];
    // fetch server info from API and add it to servers array
    fetch('/api/servers')
        .then(res => res.json())
        .then(data => {
            servers.push(...data.servers);
            createServerList();
        })
        .catch(error => {
            console.error('Error fetching server data:', error);
        });

    const createServerList = () => {
        const html = servers.map(server => {
            return `
                <li>
                    <a href="/settings/?serverId=${server.id}">${server.name}</a>
                </li>
            `;
        }).join('');
        serverList.innerHTML = html;
    }
});
