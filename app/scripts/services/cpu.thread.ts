/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

interface IThread extends ng.resource.IResource<IThread> {
    id: number;
    type: string;
    name: string;
    state: string;
}

interface IThreadResource extends ng.resource.IResourceClass<IThread> {
}

function ThreadResource($resource: ng.resource.IResourceService, $server: ServerProvider) {
    return <IThreadResource> $resource($server.getAddress() + '/cpu/threads/:id', { id: '@id' });
}
