;(function() {
	if (window.Element && Element.prototype.remove) { return; }

	var remove = function() {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
	var before = function() {
		var nodes = arguments;
		while (nodes.length) {
			var node = nodes.shift();
			if (typeof node == "string") {
				this.insertAdjacentHTML("beforebegin", node);
			} else {
				this.parentNode.insertBefore(node, this);
			}
		}
	};
	var after = function() {
		var nodes = arguments;
		while (nodes.length) {
			var node = nodes.shift();
			if (typeof node == "string") {
				this.insertAdjacentHTML("afterend", node);
			} else {
				this.parentNode.insertBefore(node, this.nextSibling);
			}
		}
	};
	var replaceWith = function() {
		this.after.apply(this, arguments);
		this.remove();
	};

	Element.prototype.remove = DocumentType.prototype.remove = CharacterData.prototype.remove = remove;
	Element.prototype.before = DocumentType.prototype.before = CharacterData.prototype.before = before;
	Element.prototype.after = DocumentType.prototype.after = CharacterData.prototype.after = after;
	Element.prototype.replaceWith = DocumentType.prototype.replaceWith = CharacterData.prototype.replaceWith = replaceWith;
});