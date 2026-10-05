from importlib.util import spec_from_file_location, module_from_spec
from pathlib import Path
spec=spec_from_file_location('pastoral_prepare',Path(__file__).with_name('prepare-pastoral.py'))
module=module_from_spec(spec);spec.loader.exec_module(module)
prepare,ROOT,OUT,compact=module.prepare,module.ROOT,module.OUT,module.compact
