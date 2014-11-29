/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

interface IMemoryPage extends ng.resource.IResource<IMemoryPage> {
    addr: number;
    data: string;
}

interface IMemoryPageResource extends ng.resource.IResourceClass<IMemoryPage> {
}

function MemoryPageResource($resource: ng.resource.IResourceService, $server: ServerProvider) {
    return <IMemoryPageResource> $resource($server.getAddress() + '/memory/:addr', { addr: '@addr' });
}
