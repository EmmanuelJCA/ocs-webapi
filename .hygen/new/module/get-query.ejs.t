---
to: "src/modules/<%= h.fileName(name) %>/queries/<%= h.getQueryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('GetQuery') %>
---
<%

 ClassName = h.ClassName(name);
 fieldName = h.changeCase.camel(ClassName);

 GetQueryName = h.GetQueryName(name);
 GetHandlerName = h.GetHandlerName(name);

 CreateDtoName = h.CreateDtoName(name);
 createDtoName = h.changeCase.camel(CreateDtoName);
 createDtoFileName = h.createDtoFileName(name);

 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);

 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);
 entityFileName = h.entityFileName(name);

 RepositoryName = h.RepositoryName(name);
 repositoryName = h.changeCase.camel(RepositoryName);
 repositoryFileName = h.repositoryFileName(name);

%>import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { <%= RepositoryName %> } from '../<%= repositoryFileName %>';

export class <%= GetQueryName %> implements ICommand {
  constructor(
    public readonly userId: Uuid,
  ) {}
}

@QueryHandler(<%= GetQueryName %>)
export class <%= GetHandlerName %> implements IQueryHandler<<%= GetQueryName %>> {
  constructor(private <%= repositoryName %>: <%= RepositoryName %>) {}

  async execute(query: <%= GetQueryName %>) {
    return this.<%= repositoryName %>.find({
      userId: query.userId,
    });
  }
}
