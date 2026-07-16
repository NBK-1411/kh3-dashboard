export function init(root, { requests = [], approvals = [] } = {}) {
  root.querySelector("[data-request-count]").textContent = `${requests.length} open`;
  root.querySelector("[data-approval-count]").textContent = `${approvals.length} due`;
  root.querySelector("[data-requests]").innerHTML = requests.map(renderRequest).join("");
  root.querySelector("[data-approvals]").innerHTML = approvals.map(renderApproval).join("");
}

function renderRequest(request) {
  return `
    <article class="workflow-row">
      <div>
        <h4>${request.title}</h4>
        <p>${request.owner} - ${request.due}</p>
      </div>
      <span class="status-badge ${request.tone || ""}">${request.status}</span>
      <button class="link-button" type="button" data-link="${request.title}">Open</button>
    </article>
  `;
}

function renderApproval(approval) {
  return `
    <article class="workflow-row">
      <div>
        <h4>${approval.title}</h4>
        <p>${approval.requester} - ${approval.context} - ${approval.due}</p>
      </div>
      <span class="status-badge ${approval.tone || ""}">${approval.priority}</span>
      <button class="link-button" type="button" data-approval-action="${approval.id}">Review</button>
    </article>
  `;
}
